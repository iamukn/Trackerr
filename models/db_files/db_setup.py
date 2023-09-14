#!/usr/bin/python3
""" Script that configures and makes database queries """


from bcrypt import checkpw, gensalt, hashpw
from pymongo import MongoClient

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
                    }
                )
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
