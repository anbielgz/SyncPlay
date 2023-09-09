<script setup>
	

	function closeWindow() {
		window.electron.ipcRenderer.invoke('close-window')
	}

	function minimizeWindow() {
		window.electron.ipcRenderer.invoke('minimize-window')
	}
	
</script>

<template>

	<div class="title-bar">

		<div class="title-bar-container">

			<!--Options Menu-->
			<div class="options-menu">
				<div class="options-menu-container">
					
					<div class="menu-brand">
						<i class="fas fa-bars"></i>
					</div>

					<ul class="menu-actions">

						<li class="menu-item">
							<i class="fas fa-file"></i>
							Archivo
						</li>
						<li class="menu-item">
							<i class="fas fa-gear"></i>
							Ajustes
						</li>
						<li class="menu-item">
							<i class="fas fa-border-all"></i>
							Panel
						</li>
						<li class="menu-item">
							<i class="fas fa-circle-question"></i>
							Ayuda
						</li>

					</ul>

				</div>
			</div>

			<div class="title-app">
				<h5>SyncPlay</h5>
			</div>

			<!--Actions Buttons-->
			<div class="actions-buttons">
				<button class="action-btn minimize" @click="minimizeWindow">
                    <i class="fas fa-window-minimize"></i>
                </button>
                <button class="action-btn close" @click="closeWindow">
                    <i class="fas fa-close"></i>
                </button>
			</div>
		</div>

	</div>

</template>

<style scoped>
	

	.title-bar {
		width: 100%;
		height: 60px;
		display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
        color: var(--primary-text-color);
	}

	.title-bar-container {
		width: 98%;
        height: 65%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--secundary-bg-color);
        border-radius: 20px;
        -webkit-box-shadow: 3px 6px 13px -1px rgba(0,0,0,0.55);
        -moz-box-shadow: 3px 6px 13px -1px rgba(0,0,0,0.55);
        box-shadow: 3px 6px 13px -1px rgba(0,0,0,0.55);
        -webkit-app-region: drag;
	}

    /*Options Menu Styles*/
	.options-menu-container {
		display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 2px;
        -webkit-app-region: no-drag;
	}

	.menu-brand {
        height: 35px;
        width: 34px;
        background-color: #242323;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .menu-actions {
        margin: 0px 2px;
        list-style: none;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-family: 'Russo One', Arial;
    }

    .menu-item {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30px;
        width: 65px;
        margin: 0px 1px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        font-size: 10px;
    }
    
    .menu-item > i {
        font-size: 15px;
        margin-right: 5px;
    }

    .menu-item:hover {
        background-color: var(--primary-bg-color);
    }
    /*Options Menu Styles End*/

    /*Actions Buttons Styles*/
    .actions-buttons {
        margin-right: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        -webkit-app-region: no-drag;
    }
    .action-btn {
        height: 27px;
        width: 26px;
        margin: 0px 1px;
        background-color: var(--secundary-bg-color);
        cursor: pointer;
        color: var(--primary-text-color);
        border-radius: 50%;
        transition: all 0.3s ease-in;
    }

    .action-btn:hover {
        background-color: #242323;
    }

    .minimize {
        background-color: var(--min-bg-color);
    }

    .close {
        background-color: var(--closed-bg-color);
    }

    .menu-action-item:hover > .dropdown-menu {
        display: block;
    }
    /*Actions Buttons Styles End*/

    /*Title App Styles*/
    .title-app {
        font-family: Russo One;
        user-select: none;
        text-align: center;
        height: 98%;
        width: 120px;
        display: flex;
        align-items: center;
        position: relative;
    }

    .title-app > h5 {
        position: absolute;
        top: 10;
        left: -60px;
    }
</style>