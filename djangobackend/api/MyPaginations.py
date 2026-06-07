# from rest_framework.pagination import PageNumberPagination

# class MyPaginations(PageNumberPagination):
#     page_size = 5
#     page_query_param = 'p'
#     page_size_query_param = 'records'   # allows the user to set page size
#     max_page_size = 7  # sets maximum page size to prevent any invalid page error due to privilge abuse
#     last_page_strings = 'end'  # provides the last items



# from rest_framework.pagination import LimitOffsetPagination

# class MyLimitOffsetPagination(LimitOffsetPagination):
#     default_limit = 5
#     limit_query_param = 'mylimit'
#     offset_query_param = 'myoffset'
#     max_limit= 6


from rest_framework.pagination import CursorPagination

class MyCursorPagination(CursorPagination):
    page_size = 10
    ordering = 'title'
    cursor_query_param = 'cur'