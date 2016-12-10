from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from apprest import views


urlpatterns = [
    url(r'^apprest/$', views.libro_list),
    url(r'^postuser/$', views.post_user),
    url(r'^getusers$', views.get_users),
    url(r'^getuser/(?P<id>[\w\-]+)$', views.get_user),
    url(r'^updateuser/(?P<id>[\w\-]+)$', views.update_user),
    url(r'^transfer$', views.transfer),
    url(r'^transactions$', views.get_transactions),
    url(r'^apprest/(?P<pk>[0-9]+)/$', views.libro_detail),
]

urlpatterns = format_suffix_patterns(urlpatterns)
