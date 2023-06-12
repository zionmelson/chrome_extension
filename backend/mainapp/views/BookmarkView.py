from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import UserModel, LInkModel


class BookmarkView(APIView):
    """
    Get recommendation of query
    """

    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        try:
            # get data
            data = request.data
            # get user with email
            email = request.user
            user = UserModel.objects.get(email=email)
            # Create new bookmark link
            LInkModel.objects.create(
                userId = user,
                url = data["url"],
                time = data["time"],
                lastVisitDateTime = data["lastVisitDateTime"],
                frequency = data["frequency"],
                clickCount = data["clickCount"],
                level = data["level"]
            )
            return Response({"Success": True}, status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"error": str(e)}, status.HTTP_400_BAD_REQUEST)
