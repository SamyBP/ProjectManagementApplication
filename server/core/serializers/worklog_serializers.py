from core.serializers.utils import BaseModelSerializer
from core.serializers import TaskDetailSerializer

from core.models import WorkLog

class WorkLogRequestSerializer(BaseModelSerializer):
    class Meta:
        model = WorkLog
        fields = ['hours_worked']
    

class WorkLogResponseSerializer(BaseModelSerializer):
    task = TaskDetailSerializer()
    
    class Meta:
        model = WorkLog
        fields = '__all__'