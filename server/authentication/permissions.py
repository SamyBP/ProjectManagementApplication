from rest_framework.permissions import BasePermission


class IsProjectOwner(BasePermission):
    """Permission class used to restrict actions to views that require the user to be owner of project"""

    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user


class HasTaskAssigned(BasePermission):
    """Permission class used to restrict update to a task item"""

    def has_object_permission(self, request, view, obj):
        return obj.assignee == request.user