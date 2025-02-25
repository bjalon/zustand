class AuthService {
    static login = (login: string, password: string): string => {
        if (login === 'sdfsd@sdfsd.fr' && password === 'sdfsd@sdfsd.fr') {
            return 'token';
        }
        throw new Error('Invalid login or password');
    }
}

export default AuthService;