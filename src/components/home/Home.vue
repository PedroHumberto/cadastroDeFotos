<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>
    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>
    <input
      type="search"
      class="filtro"
      @input="filtro = $event.target.value"
      placeholder="filtre por parte do título"
    />

    <ul class="lista-fotos">
      <li
        class="lista-fotos-item"
        v-for="foto in fotosComFiltro"
        :key="foto.titulo"
      >
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva
            v-meu-transform:scale.animate="1.1"
            :url="foto.url"
            :titulo="foto.titulo"
          />
          <meu-botao
            tipo="button"
            rotulo="remover"
            @botaoAtivado="remove(foto)"
            :confirmacao="true"
            estilo="perigo"
          />
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from "../shared/painel/Painel.vue";
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import Botao from "../shared/botao/Botao.vue";
import transform from "../directives/Transform";
import FotoService from "../domain/foto/FotoService"

export default {
  components: {
    "meu-painel": Painel,
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao": Botao,
  },
  directives: {
    "meu-transform": transform,
  },
  data() {
    return {
      titulo: "Banco de Fotos",
      fotos: [],
      filtro: "",
      mensagem: "",
    };
  },
  methods: {
    remove(foto) {



      this.service.apaga(foto._id)
      .then(() => {
          let indice = this.fotos.indexOf(foto);
          this.fotos.splice(indice, 1);
          this.mensagem = 'Foto Removida Com Sucesso'
        },err => {
            console.log(err);
            this.mensagem = 'não foi possivel remover a foto';
        })

      /*
      this.resource
      .delete({ id: foto._id })
      .then(() => {
          let indice = this.fotos.indexOf(foto);
          this.fotos.splice(indice, 1);
          this.mensagem = 'Foto Removida Com Sucesso'
        },err => {
            console.log(err);
            this.mensagem = 'não foi possivel remover a foto';
        })*/

    /*
      this.$http.delete(`v1/fotos/${foto._id}`)
      .then(() => {
        let indice = this.fotos.indexOf(foto);
        this.fotos.splice(indice, 1);
        this.mensagem = 'Foto Removida Com Sucesso'
      },err => {
          console.log(err);
          this.mensagem = 'não foi possivel remover a foto';
      })*/
    },
  },

  computed: {
    fotosComFiltro() {
      return this.fotos.filter((foto) =>
        foto.titulo.toLowerCase().includes(this.filtro.toLowerCase())
      );
    },
  },

  created() {

    this.service = new FotoService(this.$resource)


    
    this.service
      .lista()
      .then(
        (fotos) => (this.fotos = fotos),
        (err) => console.log(err)
      );

    /*
    this.$http.get('http://localhost:3000/v1/fotos')
      .then(res => res.json())
      .then(fotos => this.fotos = fotos, err => console.log(err));
    */
  },
};
</script>

<style>
.centralizado {
  text-align: center;
}

.lista-fotos {
  list-style: none;
}

.lista-fotos .lista-fotos-item {
  display: inline-block;
}

.filtro {
  display: block;
  width: 100%;
}
</style>
