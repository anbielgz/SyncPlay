<script setup>
  import { ref, reactive, onMounted, onBeforeMount, onBeforeUnmount } from 'vue'
  import TitleBar from './components/Title-bar.vue'
  import LaunchButton from './components/LaunchButton.vue'
  import MasterVolume from './components/MasterVolume.vue'
  import ContextMenu from './components/ContextMenu.vue'

  
  const playList = reactive({})
  const menuIsOpen = ref(false)
  const mousePositionX = ref()
  const mousePositionY = ref()
  const btnID = ref()
  const btnContent = ref()

  function set_defatul_list() {

    if(localStorage.getItem('setLists') == null) {
      let fileList = [
          { 
            playListName: "default",
            list: [
              { buttonID: 1, name: "", src: "", ext: ""},
              { buttonID: 2, name: "", src: "", ext: ""},
              { buttonID: 3, name: "", src: "", ext: ""},
              { buttonID: 4, name: "", src: "", ext: ""},
              { buttonID: 5, name: "", src: "", ext: ""},
              { buttonID: 6, name: "", src: "", ext: ""},
              { buttonID: 7, name: "", src: "", ext: ""},
              { buttonID: 8, name: "", src: "", ext: ""},
              { buttonID: 9, name: "", src: "", ext: ""},
              { buttonID: 10, name: "", src: "", ext: ""},
              { buttonID: 11, name: "", src: "", ext: ""},
              { buttonID: 12, name: "", src: "", ext: ""}
            ]
          },
        ] 

      localStorage.setItem('setLists', JSON.stringify(fileList))
      console.log('Lista por defecto establecida correctamente')
    }
  }

  function save_list() {
    localStorage.setItem('setLists', JSON.stringify(list.value))
  }

  function load_List() {
    const setList = JSON.parse(localStorage.getItem('setLists'))
    playList.value = setList[0]

    console.log(playList)
  }

  function showMenu(op) {
    console.log('Menu Contexual Abierto')
    mousePositionX.value = op.mousePosition.x
    mousePositionY.value = op.mousePosition.y
    menuIsOpen.value = op.value
    btnID.value = op.id
    btnContent.value = op.content
  }

  function closeMenu() {
    menuIsOpen.value = false
    mousePositionX.value = 0
    mousePositionY.value = 0
    btnID.value = 0
    console.log('Menu Contexual Cerrado')
  }

  function selectedFile(file, id ) {
    playList.value.list.map(item => {
      if(item.buttonID == id) {
        item.name = file.name
        item.src = file.path
        item.ext = file.ext
      }
    })

    console.log(playList.value.list)

  }

  onBeforeMount(() => {
    set_defatul_list()
    load_List()
  })

  onMounted(() => {
    //document.addEventListener('click', closeMenu())
  })

  /*onBeforeUnmount(() => {
    document.addEventListener('click', closeMenu())
  })*/
 

</script>

<template>

  <header>
    <TitleBar />
  </header>

  <main>

    <div class="main-container">

      <section class="left-panel">
        <div v-for="song in playList.value.list" :key="song.buttonID">
          <LaunchButton :fileName="song.name" 
                        :src="song.src" 
                        :ext="song.ext" 
                        :buttonID="song.buttonID"
                        @showContextMenu="showMenu"/>
        </div>
      </section>

      <section class="right-panel">
        <MasterVolume/>
      </section>

      <ContextMenu v-if="menuIsOpen" 
                  :style="{ top: mousePositionY + 'px', left: mousePositionX + 'px'}"
                  :class="{ 'context-menu-open': menuIsOpen = true}"
                  :button="btnID"
                  :buttonContent="btnContent"
                   v-click-outside="closeMenu"
                   @closeMenu="closeMenu"
                   @selectedFile="selectedFile"/>
    </div>

  </main>

</template>

<style>
  body {
    background-color: var(--primary-bg-color);
  }
  .main-container {
    width: 96%;
    height: 100%;
    margin: 10px auto;
    display: flex;
  }

  .left-panel {
    color: #fff;
    width: 80%;
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 4 columnas del mismo tamaño */
    grid-template-rows: repeat(3, 1fr); /* 3 filas del mismo tamaño */
    gap: 5px; /* Espacio entre las celdas */
    justify-items: center;
    align-items: center;
  }

  .right-panel {
    color: #fff;
    width: 20%;
    height: calc(100% - 65px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
