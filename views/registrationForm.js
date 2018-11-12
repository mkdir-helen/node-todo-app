function registrationForm(){
    return `
        <form action="/register" method="POST">
            <label for="">
                Your name:
                <input type="text" name="name">
            </label>
            <br>
            <label for="">
                Username:
                <input type="text" name="username">
            </label>
            <br>
            <label for="">
                Password:
                <input type="password" name="password">
            </label>
            <br>
            <input type="submit" value="Register!">
        </form>
    `;
}

module.exports = registrationForm;