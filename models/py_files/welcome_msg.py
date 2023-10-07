#!/usr/bin/python3
""" Instant Email messaging """


import yagmail
import os


def email(email: str, user: str) -> None:
    """Method that sends out an email"""
    if not email:
        return

    sender = os.getenv("email")
    pw = os.environ.get("password")
    # registers the email and pw to keyframes
    yagmail.register(sender, pw)
    yag = yagmail.SMTP(sender)
    headers = {"Reply-to": "officialtrackerr@gmail.com"}
    # sends the mail to the client
    with open("./models/py_files/welcome_txt.txt", "r") as f:
        data = f.read()
        yag.send(
            to=email,
            subject="Welcome to Trackerr",
            headers=headers,
            contents=f"<h3>Hello {user}</h3>" + data,
        )

def contact_us(name: str, email: str, msg: str) -> None:
    if not email:
        return
    sender = os.getenv("email")
    pw = os.environ.get("password")
    # registers the email and pw to keyframes
    yagmail.register(sender, pw)
    yag = yagmail.SMTP(sender)
    headers = {"Reply-to": email}
    yag.send(to='officialtrackerr@gmail.com', subject="Message from customer", headers=headers, contents=f"Hello from {name}, \n{msg}")
