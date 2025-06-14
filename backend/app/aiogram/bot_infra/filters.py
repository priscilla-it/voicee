# TODO:

# from aiogram import types
#
# from src.bot_lib.aiogram_overloads import AbsFilter
# from src.bot_lib.bot_feature import TgUser
# from src.config import settings
# from src.db_infra.db import check_user_registered
#
#
# class CreatorFilter(AbsFilter):
#     key = 'creator'
#
#     async def check(self, msg: types.Message) -> bool:
#         return (
#             settings.creator_id is None
#             or msg.from_user.id == settings.creator_id
#         )
#
#
# class RegistrationFilter(AbsFilter):
#     key = 'registered'
#
#     async def check(self, msg: types.Message) -> bool:
#         return await check_user_registered(
#             tg_user=TgUser(
#                 tg_id=msg.from_user.id, username=msg.from_user.username
#             )
#         )
#
#
# class NonRegistrationFilter(AbsFilter):
#     key = 'not_registered'
#
#     async def check(self, msg: types.Message) -> bool:
#         return not await check_user_registered(
#             tg_user=TgUser(
#                 tg_id=msg.from_user.id, username=msg.from_user.username
#             )
#         )
