<script setup>
	import { ref, computed } from 'vue'

	const props = defineProps({
		button: Number,
		buttonContent: String,
	})
	const emits = defineEmits(['closeMenu', 'selectedFile'])

	//Recibe el contenido de la variable 'src' del LaunchButton
	//Para comprobar si tiene o no tiene contenido asignado
	const asigned_button = computed(() => {
		return props.buttonContent && props.buttonContent !== '' ? false : true
		
	})

	//Metodos
	async function OpenFileDialog() {
		try {
			
			const file = await window.electron.ipcRenderer.invoke('open-dialog')
			emits('closeMenu')
			emits('selectedFile', file, props.button)
		} catch(err) {
			console.log(err)
		}
	}

	function openFolder() {
		
		window.electron.ipcRenderer.invoke('open-folder')
		
		emits('closeMenu')
	}

	
</script>

<template>
	<div class="context-menu">

		<ul v-if="asigned_button" class="context-menu-list" >

			<li class="ctx-menu-item" @click="OpenFileDialog">
				<i class="fas fa-file"></i>
				<p>Asignar archivo</p>
			</li>
			<span class="separator"></span>
			<li class="ctx-menu-item" @click="openFolder">
				<i class="fas fa-folder-open"></i>
				<p>Abrir Carpeta</p>
			</li>

		</ul>
		<ul v-else class="context-menu-list" >
			<li class="ctx-menu-item">
				<i class="fas fa-play"></i>
				<p>Reproducir / Parar</p>
			</li>

			<li class="ctx-menu-item">
				<i class="fas fa-reply"></i>
				<p>Repetir</p>
			</li>
			

			<span class="separator"></span>

			<li class="ctx-menu-item">
				<i class="fas fa-copy"></i>
				<p>Copiar</p>
			</li>
			<li class="ctx-menu-item">
				<i class="fas fa-paste"></i>
				<p>Pegar</p>
			</li>
			<li class="ctx-menu-item" @click="openFolder">
				<i class="fas fa-folder-open"></i>
				<p>Abrir Carpeta</p>
			</li>
			<li class="ctx-menu-item">
				<i class="fas fa-file-pen"></i>
				<p>Renombrar</p>
			</li>
			<li class="ctx-menu-item">
				<i class="fas fa-trash"></i>
				<p>Eliminar</p>
			</li>
		</ul>

	</div>
</template>

<style scoped>
	.context-menu {
		background-color: var(--secundary-bg-color);
		position: fixed;
		min-width: 130px;
		max-width: 180px;
		border-radius: 15px;
		border: 2px solid #212121;
		color: var(--primary-text-color);
		padding: 7px 0px;
		box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);

		opacity: 0;
		transform: scale(0.8);
		transition: transform 0.12s cubic-bezier(0.0, 0.0, 0.2, 1), opacity 0.03s linear;
		will-change: opacity, transform ;
	}

	.context-menu-open {
		opacity: 1;
		transform: scale(1);
	}

	.separator {
		display: block;
        margin: 4px 0;
        border-bottom: 1px solid #212121;
	}

	.context-menu-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.ctx-menu-item {
		position: relative;
		margin: 1px 0;
	    cursor: pointer;
	    padding: 10px 13px;
	    display: flex;
	    align-items: center;
	    justify-content: space-between;
	    user-select: none;
	    -ms-user-select: none;
	    transition: background-color .10s linear;
	}

	.ctx-menu-item i {
		font-size: 15px;
		width: 20px;
		height: 20px;
		line-height: 20px;
		text-align: center;
	}

	.ctx-menu-item p {
		display: block;
		font-family: Roboto Regular;
		font-size: 12px;
		text-align: left;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    overflow: hidden;
	    width: 100%;
	    padding: 2px;
	    margin-left: 5px;
	}

	.ctx-menu-item:hover {
		background-color: var(--primary-bg-color);
	}

	@keyframes aparition {
		to {
			height: 0;
		}
		from {
			height: 100%;
		}
	}
</style>
