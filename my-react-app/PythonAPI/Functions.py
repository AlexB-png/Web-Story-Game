import sqlite3
import bcrypt


def Login(username, password):
    connection = sqlite3.connect("Data.db")
    cursor = connection.cursor()

    data = cursor.execute("SELECT user,pass FROM data WHERE user=?", (username,)).fetchone()

    if not data:
        print("Invalid Username")
        return False
    else:
        EncryptedPass = data[1]
        EncodedPass = password.encode("UTF-8")
        return bcrypt.checkpw(EncodedPass, EncryptedPass)


def Create(username, password):
    connection = sqlite3.connect('Data.db')
    cursor = connection.cursor()

    if Check(username):  # User doesn't exist = True #
        if len(username ) > 3 and len(password) > 3:
            salt = bcrypt.gensalt()
            password = bcrypt.hashpw(bytes(password.encode('UTF-8')), salt)
            
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
