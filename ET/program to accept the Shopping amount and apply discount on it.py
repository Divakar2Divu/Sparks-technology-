# -*- coding: utf-8 -*-
"""Untitled0.ipynb

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/1icMD6HeC4iDPgZMnx24yG9yKRla7FNMl
"""

# Accept the shopping amount from the user
amount = float(input("Enter the shopping amount: "))
# Apply discount based on the amount entered
if amount >= 5000:
  discount = 0.50 # 50% discount for amounts 5000 or more
elif amount >= 2000:
  discount = 0.25 # 25% discount for amounts 2000 or more
elif amount >= 500:
  discount = 0.10 # 10% discount for amounts 500 or more
else:
  discount = 0 # No discount for amounts less than 500
# Calculate the final amount to be paid after applying the discount
final_amount = amount - (amount * discount)
# Display the final amount to the user
print("Amount to be paid after discount:", final_amount)

