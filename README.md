# to_do_com_banco

### Primeiro passo

- npm install

### dev-dependencias

- npm i typescript tsx @types/express @types/node

## Criar um banco

configure o .env com o que está escrito no env.example

# 1 Para criar com historico de migrações :

npx prisma migrate dev --name init

# 2 Para criar sem historico de migrações :

npx prisma db push

### Rodar

npm run dev
