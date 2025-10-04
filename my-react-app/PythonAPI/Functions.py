import sqlite3


def Login(username, password):
    connection = sqlite3.connect("Data.db")
    cursor = connection.cursor()
    data = cursor.execute("SELECT user,pass FROM data WHERE user=? AND pass=?", (username, password))
    if data.fetchone():
        return True
    else:
        return False


def Create(username, password):
    connection = sqlite3.connect('Data.db')
    cursor = connection.cursor()
    if Check(username):  # User doesn't exist = True #
        if len(username ) > 3 and len(password) > 3:
            cursor.execute("INSERT INTO data (user , pass) VALUES (? , ?)", (username, password))
            connection.commit()
            return True, "Account Successfully Created"
        else:
            return False, "Username or password Too Short"
    else:
        return False, "Username Already In Use"


def Check(username):
    connection = sqlite3.connect("Data.db")
    cursor = connection.cursor()
    data = cursor.execute("SELECT user FROM data WHERE user=?", (username,))
    x = data.fetchone()
    connection.close()
    return x is None  # If user exists return False #


def test():
    # Variables #
    user = input("Username: ")
    password = input("Password: ")
    ##

    print(Create(user, password))


if __name__ == '__main__':
    # THIS IS STRICTLY FOR TESTING PURPOSES #
    test()
