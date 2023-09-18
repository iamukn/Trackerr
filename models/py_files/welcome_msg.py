#!/usr/bin/python3
""" Instant Email messaging """


import yagmail
import os

def email(email: str, username: str) -> None:
    """ Method that sends out an email """
    if not email:
        return
    
    sender = os.getenv('email')
    pw = os.environ.get('password')
    #registers the email and pw to keyframes
    yagmail.register(sender, pw)
    yag = yagmail.SMTP(sender)
    # sends the mail to the client
    with open('welcome_txt.txt', 'r') as f:
        data = f.read()
        yag.send(to=email, subject= 'Testing the Mic', contents=f'Hello {username} \n'+ data)
    print('Successful :)')

