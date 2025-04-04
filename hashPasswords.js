import bcrypt from 'bcrypt';

const saltRounds = 10;

async function gerarHashes() {
  const senha1 = "1234";
  const senha2 = "2311";

  const hash1 = await bcrypt.hash(senha1, saltRounds);
  const hash2 = await bcrypt.hash(senha2, saltRounds);

  console.log("Senha admin criptografada:", hash1);
  console.log("Senha teste criptografada:", hash2);
}

gerarHashes();
