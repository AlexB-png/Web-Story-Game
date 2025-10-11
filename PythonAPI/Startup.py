import sqlite3


# Connection to PySQL database #
connection = sqlite3.connect(r"Data.db")
##

# Makes the cursor to execute commands #
cursor = connection.cursor()
##

# Make Table #
# cursor.execute("CREATE TABLE users(user, pass)")
##

# When i want to add a column #
cursor.execute("ALTER TABLE users ADD COLUMN secret_code TEXT")

# Add data to sql file #
connection.commit()
##
