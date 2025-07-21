from django.http import JsonResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .models import Property, Reservation
from .serializers import PropertiesDetailSerializer, PropertiesListSerializer, ReservationsListSerializer
from .forms import PropertyForm
from rest_framework_simplejwt.tokens import AccessToken
from useraccount.models import User


# ✅ 모든 숙소 목록 조회 API (GET)
# 누구나 접근 가능 (비로그인도 OK)
@api_view(['GET'])
@authentication_classes([])  # 인증 클래스 제거 → 인증 없이 접근 가능
@permission_classes([])      # 권한 검사도 하지 않음
def properties_list(request):

    # Auth
    try:
        token = request.META['HTTP_AUTHORIZATION'].split('Bearer ')[1]
        token = AccessToken(token)
        user_id = token.payload['user_id']
        user = User.objects.get(pk=user_id)
    except Exception as e:
        user = None

    favorites = []
    properties = Property.objects.all()

    # 쿼리 파라미터에서 landlord_id가 있을 경우 필터링
    landlord_id = request.GET.get('landlord_id', '')
    is_favorites = request.GET.get('is_favorites', '')    
    
    if landlord_id:
        properties = properties.filter(landlord_id=landlord_id)
    
    if is_favorites:
       properties = properties.filter(favorited__in=[user])
        
        
    # Favorite 찾기        
    if user:
        for property in properties:
            if user in property.favorited.all():
                favorites.append(property.id)


    serializer = PropertiesListSerializer(properties, many=True)
    
    
    return JsonResponse({
         'data': serializer.data,
         'favorites': favorites
     })





# ✅ 특정 숙소 상세 조회 API (GET)
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def property_detail(request, pk):
    # pk를 기준으로 Property 객체 하나 조회
    property = Property.objects.get(pk=pk)
    serializer = PropertiesDetailSerializer(property, many=False)
    return JsonResponse(serializer.data)





# ✅ 숙소에 대한 예약 목록 조회 API (GET)
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def property_reservations(request, pk):
    # 특정 숙소의 예약 목록 조회
    property = Property.objects.get(pk=pk)
    reservations = property.reservations.all()

    serializer = ReservationsListSerializer(reservations, many=True)
    return JsonResponse(serializer.data, safe=False)






# ✅ 숙소 생성 API (POST + 파일 업로드)
@api_view(['POST', 'FILE'])  # NOTE: 'FILE'은 실제 HTTP 메서드는 아니므로 의미 없음 → 보통 ['POST'] 만 사용
def create_property(request):
    # POST 데이터 + 업로드된 파일을 기반으로 폼 인스턴스 생성
    form = PropertyForm(request.POST, request.FILES)
    
    if form.is_valid():
        # 로그인한 유저를 임대인으로 지정하고 저장
        property = form.save(commit=False)
        property.landlord = request.user
        property.save()
        return JsonResponse({"success": True})
    else:
        # 폼 유효성 오류 응답
        print('error', form.errors, form.non_field_errors)
        return JsonResponse({"errors": form.errors.as_json()}, status=400)






# ✅ 숙소 예약 생성 API (POST)
@api_view(['POST'])
def book_property(request, pk):
    try:
        # 요청 데이터에서 예약 정보 추출
        start_date = request.data.get('start_date', '')
        end_date = request.data.get('end_date', '')
        number_of_nights = request.data.get('number_of_nights', '')
        total_price = request.data.get('total_price', '')
        guests = request.data.get('guests', '')

        # 해당 숙소 객체 조회
        property = Property.objects.get(pk=pk)

        # 예약 생성
        Reservation.objects.create(
            property=property,
            start_date=start_date,
            end_date=end_date,
            number_of_nights=number_of_nights,
            total_price=total_price,
            guests=guests,
            created_by=request.user  # 현재 로그인한 사용자
        )
        
        return JsonResponse({"success": True})
    except Exception as e:
        # 예외 발생 시 실패 응답
        return JsonResponse({"success": False})









# ✅ 숙소 찜 토글 API (POST)
@api_view(['POST'])
def toggle_favorite(request, pk):
    # 숙소 객체 조회
    property = Property.objects.get(pk=pk)

    # 유저가 이미 찜 한 경우 → 제거
    if request.user in property.favorited.all():
        property.favorited.remove(request.user)
        return JsonResponse({'is_favorite': False})
    else:
        # 찜 안한 경우 → 추가
        property.favorited.add(request.user)
        return JsonResponse({'is_favorite': True})
