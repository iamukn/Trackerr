#!/usr/bin/python3
""" update password fuctionality """

from bcrypt import hashpw, checkpw, gensalt
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.tracker_reg

def update_pass(username: str, oldPw: str, newPw: str) -> str:
    """updates password in the database """
    col = db.get_collection('registration')
    data1 = col.find_one({'Email': username})
    data2 = col.find_one({'Username': username})
    newPw = hashpw(str(newPw).encode(), gensalt())
    oldPw = str(oldPw).encode()

    # checks if the user logged in user their email or username
    if data1:
        if checkpw(oldPw, data1.get('password')):
            col.update_one({'Email': username}, {'$set': {'password': newPw}})
            return 'Password changed successfully'
        else:
            return 'incorrect password'
    elif data2:
        if checkpw(oldPw, data2.get('password')):
            col.update_one({'Username': username}, {'$set': {'password': newPw}})
            return 'Password changed successfully'
        else:
            return 'incorrect password'
    else:
        return
