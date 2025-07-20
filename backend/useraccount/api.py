from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserDetailSerializer
from property.serializers import ReservationsListSerializer


# 특정 유저(임대인)의 프로필 정보를 프론트엔드에 제공하는 
@api_view(['GET'])
@authentication_classes([])  # 인증 클래스 비우기
@permission_classes([])      # 권한 클래스도 비우기 (예: IsAuthenticated 등 제거)
def landlord_detail(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = UserDetailSerializer(user)
    return Response(serializer.data)




@api_view(['GET'])
def reservations_list(request):
    reservations = request.user.reservations.all()

    print('user', request.user)
    print(reservations)
    
    serializer = ReservationsListSerializer(reservations, many=True)
    return Response(serializer.data)