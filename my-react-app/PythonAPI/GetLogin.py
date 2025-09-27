import sqlite3


def Login(username, password):
    connection = sqlite3.connect("Data.sql")
    cursor = connection.cursor()
    data = cursor.execute("SELECT user,pass FROM data WHERE user=? AND pass=?", (username, password))
    if data.fetchone():
        return True
    else:
        return False


if __name__ == '__main__':
    # THIS IS STRICTLY FOR TESTING PURPOSES #

    # Variables #
    user = input("Username: ")
    password = input("Password: ")
    ##

    # uses the function to see if the user is in database #
    x = (Login(user, password))

    # If x has no data (User Not Found) #
    if x is False:
        choice = input("Input anything to register: ")
        if choice:
            # Make the connection #
            connection = sqlite3.connect(r"my-react-app\Data.sql")
            cursor = connection.cursor()
            ##

            # You can force mutiple users with the same username, this is intended #
            cursor.execute("INSERT INTO data(user,pass) VALUES (?, ?)", (user, password))
            # Add the new data to the file #
            connection.commit()
            print("You are now registered!")
        else:
            print("You are not registered!")
    else:  # User Does exist #
        print(x)
