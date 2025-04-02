

function App() {
  return(
  

    
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Login</h2>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="container23">
                <input type="text" name="nome" placeholder="Nome" id="nome" />
                <input type="password" name="senha" placeholder="Senha" id="senha" />
                <button onclick="login()">Entrar</button>
            </div>
        </div>
    </div>
    
</div>


  )
  
}

export default App
