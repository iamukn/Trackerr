#!/usr/bin/env python3

import random
import string

class TrackingNumberGenerator:
    def __init__(self):
        self.used_tracking_numbers = set()

    def generate_tracking_number(self, business_name, min_length=8, max_length=15):

        # Determine a random length within the specified range
        length = random.randint(min_length, max_length)

        # Generating a random tracking num of the specified length
        tracking_number = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(length))

        # Check if the generated tracking numb is unique
        while tracking_number in self.used_tracking_numbers:
            tracking_number = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(length))

        # Append the business name to the tracking num
        tracking_number = f"{business_name}{tracking_number}"

        # Adding generated tracking num to the set of used tracking numbers
        self.used_tracking_numbers.add(tracking_number)

        return tracking_number

    def is_tracking_number_unique(self, tracking_number):
        # Check if a tracking num is unique and not in use
        return tracking_number not in self.used_tracking_numbers

    def mark_tracking_number_as_used(self, tracking_number):
        # Adding tracking num to the set of used tracking numbers
        self.used_tracking_numbers.add(tracking_number)

    def remove_tracking_number(self, tracking_number):
        # Removing tracking num from the set of used tracking numbers
        self.used_tracking_numbers.discard(tracking_number)
