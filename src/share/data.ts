import {faker} from '@faker-js/faker';

export const generateData = () => {
    return {
        "id": faker.string.uuid(),
        "fullName": faker.internet.displayName(),
        "userName": faker.internet.userName(),
        "email": faker.internet.email(),
        "password": faker.internet.password(),
        "status": true,
        "updatedAt": "2021-05-14T01:39:47.525Z",
        "createdAt": "2021-05-14T01:39:47.525Z"
    };
}