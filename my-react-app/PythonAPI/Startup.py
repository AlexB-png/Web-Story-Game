import sqlite3


# Connection to PySQL database #
connection = sqlite3.connect(r"my-react-app\Data.sql")
##

# Makes the cursor to execute commands #
cursor = connection.cursor()
##

# Make Table #
cursor.execute("CREATE TABLE data(user, pass)")
##

# Add data to sql file #
connection.commit()
##
