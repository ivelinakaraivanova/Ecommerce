from base.views import order_views as views
from django.urls import path

urlpatterns = [
    path('add/', views.addOrderItems, name='orders-add')
]