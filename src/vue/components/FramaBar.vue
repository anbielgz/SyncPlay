<script setup>

    function close_window() {
        window.electron.ipcRenderer.invoke('close-window')
    }

    function minimize_windows() {
        window.electron.ipcRenderer.invoke('minimize-window')
    }

</script>

<style scoped>
    .frame {
        width: 100%;
        height: 40px;
        user-select: none;
    }

    .frame-container {
        width: 97%;
        height: 100%;
        margin: 0px auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .app-title {
        color:#f4f4f4;
        font-family: Russo One;
    }
    /*BUTTONS*/
    .btn {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        border: none;
        background-color: #f4f4f4;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .btn:hover {
        background-color: #dddcdc;
    }

    .minimize {
        margin-right: 3px;
    }
    .minimize:hover {
        background-color: var(--min-bg-color);
        color: #f4f4f4;
    }

    .close:hover {
        background-color: var(--closed-bg-color);
        color: #f4f4f4;
    }

</style>

<template>
    <div class="frame">
        <div class="frame-container">

            <h4 class="app-title">SyncPlay</h4>

            <div class="buttons">

                <button class="btn minimize" @click="minimize_windows">
                    <i class="fa fa-window-minimize"></i>
                </button>
                <button class="btn close" @click="close_window">
                    <i class="fa fa-close"></i>
                </button>
            </div>

        </div>
    </div>
</template>