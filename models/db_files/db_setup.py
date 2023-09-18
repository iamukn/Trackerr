#!/usr/bin/python3
""" Script that configures and makes database queries """


from bcrypt import checkpw, gensalt, hashpw
from pymongo import MongoClient
from random import randint
import yagmail
import os

#from models.py_files.welcome_msg import email
# creates an instance of MongoDB class
client = MongoClient("localhost", 27017)
# creates a database inside mongoDB
db = client.tracker_reg
# creates collections to hold registration, tracking informations and site visits
# reg_col = db.create_collection('registration')
# track_col = db.create_collection('tracking')
# count_col = db.create_collection('counts')
reg = db.get_collection("registration")


# Class to handle the registration, tracking updating and authentication
class UserInfo:
    def __init__(self: None) -> None:
        """the class constructor"""
        pass

    def register(
        self,
        companyName: str,
        service: str,
        firstName: str,
        lastName: str,
        email: str,
        username: str,
        password: str,
        companyAddr: str,
        country: str,
        city: str,
        phone: str,
    ) -> str:
        """registers user information to the database"""
        # checks for uniqueness of username and email in the database
        if reg.find_one({"Username": username}) and reg.find_one({"Email": email}):
            return "Username and Email already exist"
        elif reg.find_one({"Username": username}):
            return "Username already exist"
        elif reg.find_one({"Email": email}):
            return "Email already exist"
        else:
            # Registers the user to the database
            if (
                companyName
                and service
                and firstName
                and email
                and username
                and lastName
                and password
                and companyAddr
                and country
                and city
                and phone
            ):
                # encrypt the password & register a user to the registration database
                password = hashpw(password.encode(), gensalt())
                reg.insert_one(
                    {
                        "companyName": companyName,
                        "Services": service,
                        "firstName": firstName,
                        "lastName": lastName,
                        "Username": username,
                        "password": password,
                        "Email": email,
                        "Company_Address": companyAddr,
                        "country": country,
                        "City": city,
                        "Phone": phone,
                        "track_num": 0,
                    }
                )
            #    email(email=email, username=username)
            # increments the registered members in the database
                count = db.get_collection('count')
                count.update_one({}, {'$inc': {'registered_members': 1}})
            
                return "Registration successful"
            else:
                # Returns a message if one of the required fields is missing
                return "Enter a valid credentials"

    def auth(self, login: str, password: str) -> bool:
        """Method that validates the login in the database using email or username"""
        if login and password:
            data = reg.find_one({"Username": login})
            data2 = reg.find_one({"Email": login})
            if data:
                res = data.get("Username")
                if res == login and checkpw(password.encode(), data.get("password")):
                    return True
                else:
                    return False
            elif data2:
                res1 = data2.get("Email")
                if res1 == login and checkpw(password.encode(), data2.get("password")):
                    return True
                else:
                    return False
            else:
                return "Your username or email is incorrect"
        else:
            return "Incorrect credentials"

    def recovery(self, rec_email: str) -> str:
        """ Resets a password and sends an email to the client """
        otp = str(randint(125800, 989899)).encode()
        temp_pass = hashpw(otp, gensalt())
        otp = otp.decode()
        # check to see if the email is in the database
        if reg.find_one({'Email': rec_email}):
            reg.update_one({'Email': rec_email}, {'$set': {'password': temp_pass}})
        # sends email to the customer with their otp

            email_addr = os.getenv('email')
            password = os.getenv('password')
            yagmail.register(email_addr, password)
            yag = yagmail.SMTP(email_addr)
            yag.send(to=rec_email, subject='Alice from Trackerr', contents= f'<p> Your OTP is <b> {otp} </b>. Change your password immediately you login</p>')
            return 'Check your email for your one time password'

        else:
            return 'Not a registered email address'
