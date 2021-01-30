from rest_framework import serializers
from .models import Room, Person


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room 
        fields = ('id', 'code', 'host', 'guest_can_pause', 
                    'votes_to_skip', 'created_at')


class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('guest_can_pause', 'votes_to_skip')


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('user_name', 'code')

    
class UpdateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('guest_can_pause', 'votes_to_skip', 'code')