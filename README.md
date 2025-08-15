
## Production Server

KakiGoWhere is deployed on Digital Ocean, and will be kept running until 31st August 2025.

You can access our production server [here](http://206.189.43.202/admin/login)

## 🛠️ Getting started using 🐳 Docker (Local run)

Pre-requisite:
- Follow steps on [KakiGoWhere-Backend](https://github.com/Team-2-SA60/KakiGoWhere-Backend)

---

1. Open terminal / command prompt and change directory to KakiGoWhere

    ```
    cd KakiGoWhere
    ```

2. Clone repository

    ```
    https://github.com/Team-2-SA60/KakiGoWhere-Frontend.git
    ```

3. Change directory to KakiGoWhere-Frontend/app

    ```
    cd KakiGoWhere-Frontend/app
    ```

4. Build and run React Frontend using Docker Compose

    ```
    docker compose -f ../docker/docker-compose.dev.yml up -d --build
    ```

5. Go back to [KakiGoWhere-Backend](https://github.com/Team-2-SA60/KakiGoWhere-Backend) and continue steps

6. When all containers are running, access web application @ http://localhost/admin/login