import json

from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

from .models import ConversationMessage


class ChatConsumer(AsyncWebsocketConsumer):
    # 클라이언트가 WebSocket에 연결 시 실행됨
    async def connect(self):
        # URL 경로에서 room_name 파라미터를 추출
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        # 채널 그룹 이름 생성
        self.room_group_name = f'chat_{self.room_name}'

        # 채널 그룹에 현재 채널 추가
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        # 클라이언트 연결 수락
        await self.accept()

    # 클라이언트가 WebSocket 연결을 끊을 때 실행됨
    async def disconnect(self, close_code):
        # 채널 그룹에서 현재 채널 제거
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name



        )

    # 클라이언트로부터 메시지를 수신했을 때 실행됨
    async def receive(self, text_data):
        # JSON 문자열을 파싱
        data = json.loads(text_data)

        # 클라이언트가 보낸 데이터 추출
        conversation_id = data['data']['conversation_id']
        sent_to_id = data['data']['sent_to_id']
        name = data['data']['name']
        body = data['data']['body']

        # 채널 그룹에 메시지 전송 (다른 사용자들에게 방송됨)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',  # chat_message() 메서드를 호출하게 됨
                'body': body,
                'name': name
            }
        )

        # 데이터베이스에 메시지 저장
        await self.save_message(conversation_id, body, sent_to_id)



    # 그룹에서 메시지를 받을 때 실행됨 (broadcast 메시지 처리)
    async def chat_message(self, event):
        body = event['body']
        name = event['name']

        # 메시지를 다시 클라이언트에 전송
        await self.send(text_data=json.dumps({
            'body': body,
            'name': name
        }))


    # DB에 메시지 저장 (비동기 → 동기 전환)
    @sync_to_async
    def save_message(self, conversation_id, body, sent_to_id):
        user = self.scope['user']  # 현재 WebSocket 연결한 유저 정보
        ConversationMessage.objects.create(
            conversation_id=conversation_id,
            body=body,
            sent_to_id=sent_to_id,
            created_by=user
        )
