import uuid
from django.db import models
from useraccount.models import User

class Conversation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, verbose_name="대화 ID")
    users = models.ManyToManyField(User, related_name='conversations', verbose_name="참여 사용자")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="생성일시")
    modified_at = models.DateTimeField(auto_now=True, verbose_name="수정일시")

    class Meta:
        verbose_name = "Conversation(대화)"
        verbose_name_plural = "Conversation(대화 목록)"

    def __str__(self):
        return f"대화 ID: {self.id}"

class ConversationMessage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, verbose_name="메시지 ID")
    conversation = models.ForeignKey(Conversation, related_name='messages', on_delete=models.CASCADE, verbose_name="대화")
    body = models.TextField(verbose_name="메시지 내용")
    sent_to = models.ForeignKey(User, related_name='received_messages', on_delete=models.CASCADE, verbose_name="수신자")
    created_by = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE, verbose_name="보낸 사람")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="보낸 시간")

    class Meta:
        verbose_name = "ConversationMessage(대화 메시지)"
        verbose_name_plural = "ConversationMessage(대화 메시지 목록)"

    def __str__(self):
        return f"{self.created_by} → {self.sent_to}"
