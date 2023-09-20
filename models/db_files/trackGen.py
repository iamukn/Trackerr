#!/usr/bin/python3
""" Function that generates a random tracking number """


from random import randint
from db_setup import db

col = db.get_collection('tracking')


def track_check(num: str) -> bool:
    """checks the uniqueness of a tracking"""
    if col.find_one({'tracking_number': num}):
        return True
    else:
        return False

def trackGen(username: str) -> str:
    """ function to generate tracking number"""
    if username:
        # splits up the username
        name = username.split(' ')
        # generates a random number
        num = randint(1111111111, 9999999999)
        # handles just two or one business name
        if len(name) > 1:
            ch1 = name[0][0:2].upper()
            ch2 = name[-1][-1].upper()
            tracking = f'{ch1}{num}{ch2}'
            # checks for uniqueness of tracking
            if track_check(tracking):
                trackGen(username)
            else:
                # returns the unique tracking to client
                 return tracking
      
        elif len(name) == 1:
            ch1 = name[0][0:2].upper()
            ch2 = name[0][-1].upper()
            tracking = f'{ch1}{num}{ch2}'
            if not track_check(tracking):
                return tracking
            else:
                trackGen(username)
        else:
            pass
    else:
        pass

