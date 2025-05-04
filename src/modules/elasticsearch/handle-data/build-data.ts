import {faker} from '@faker-js/faker';
import axios from "axios";

export const getFakeUserAPI = async (userId: number) => {
    return await axios.get(`https://dummyjson.com/users/${userId}`)
        .then(function (response) {
            // console.log('getFakeUserAPI - response.data:', response.data);
            const data = response.data;
            return {
                "id": faker.string.uuid(),
                "fullName": `${data?.firstName}-${data?.lastName}`,
                "userName": data?.username,
                "email": data?.email,
                "password": data?.password,
                "status": true,
                "updatedAt": new Date().toISOString(),
                "createdAt": new Date().toISOString()
            };
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const generateData = () => {
    return {
        "id": faker.string.uuid(),
        "fullName": faker.internet.displayName(),
        "userName": faker.internet.userName(),
        "email": faker.internet.email(),
        "password": faker.internet.password(),
        "status": true,
        "updatedAt": new Date().toISOString(),
        "createdAt": new Date().toISOString()
    };
}