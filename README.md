#### For developing
1. Change directory to app
```
cd app
```

2. Install dependencies
```
npm install
```

3. Run locally
```
npm run dev
```

#### Commands for local testing
1. SCA (npm audit)
```
npm audit --audit-level=high
```

2. Lint (ESLint)
```
npm run lint
```

#### Docker
1. Build docker image
```
docker build -f ../docker/Dockerfile -t kakigowhere-react .
```

2. Run docker container
```
docker run -d -p 80:80 kakigowhere-react
```

Access at (http://localhost:80)