import * as axios from "axios";

// Создаем инстанс(экземпляр axios), который будет держать в себе настройки по работе с конкретной API
const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "0f39f1c0-268a-4500-9f7d-c9c9e4e46d72"
    }
});


// 1 вариант сделать DAL
/*
// Используем эту функцию в файле UsersssContainer при получении пользователей и при переходе по страницам
export const getUsers = (currentPage = 1, pageSize = 10) => {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => {
            return response.data;
        }); // делаем return того, что вернул then, а then вернул другой промис
}

// Используем эту функцию в файле ProfileContainer при работе с профилями пользователей
export const getProfile = (userId) => {
    return instance.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
        .then(response => {
            return response.data;
        });
}

// Используем эту функцию в файле HeaderContainer при работе с логинизацией
export const AuthMe = () => {
    return instance.get(`https://social-network.samuraijs.com/api/1.0/auth/me`)
    .then(response => {
        return response.data;
    });
}

// Используем эти функции в файле Usersss при работе с follow и unfollow
export const Unfollow = (id) => {
    return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${id}`)
    .then(response => {
        return response.data;
    });
}

export const Follow = (id) => {
    return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${id}`)
    .then(response => {
        return response.data;
    });
}
*/

// 2 вариант = упорядочеваем все методы в один объект
export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            }); // делаем return того, что вернул then, а then вернул другой промис. Т.е then вернул другой промис, а данные которые мы вернули к ним можно достучаться в слудующем then
    },
    follow(userId) {
        return instance.post(`follow/${userId}`);
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`);
    },
    getProfile(userId) {
        console.warn('Obsolete method. Please use profileAPI object. ')
        return profileAPI.getProfile(userId);
    }
};

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId);
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status});
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile);
    }
};

export const authAPI = {
    me() {
        return instance.get(`auth/me`);
    },
    login(email, password, rememberMe = false, captcha = null) {
        return instance.post(`auth/login`, { email: email, password: password, rememberMe: rememberMe, captcha: captcha });
    },
    logout() {
        return instance.delete(`auth/login`);
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    }
}




