from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .recommendation import predict


class RecommendationView(APIView):
    """
    Get recommendation of query
    """

    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        result = predict(request.data["query"])
        return Response({"recommendations": result}, status=status.HTTP_200_OK)
