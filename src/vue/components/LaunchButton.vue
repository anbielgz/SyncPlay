<script setup>
	import { ref, reactive, computed, watch, onBeforeMount, onMounted} from 'vue'

	const props = defineProps({
		buttonID: Number,
		src: String,

		fileName: {
			type: String,
		},
		ext: {
			type: String,
			default: "ext",
		},
	})
	const emits = defineEmits(['showContextMenu'])

	//Reactive
	var fileSound
	const volumeValue = ref(100)
	const faIcon = ref('fa-volume-xmark')
	const statusFile = ref('...')

	const showContent = computed(() => {
		let res
		if(props.src && props.src !== ''){
			res = true
			fileSound = new Howl({
				src: [props.src],
				onload: () => {
					console.log('audio cargado')
				}
			})
			console.log(`Instancia Howl Creada en el boton: ${props.buttonID}`)
		} else {
			res = false
		}
		return res
		
	})

	watch(volumeValue, (newValue) => {
		fileSound.volume(newValue / 100)
	})
	
	
	//Methods
	function launch_button_click(event) {
		switch(event.which) {
			case 1:

				//Pendiente
				if (fileSound.playing() == true) {
					fileSound.stop()
					statusFile.value = '...'
				} else {
					
					fileSound.play()
					statusFile.value = 'Reproduciendo...'
				}
				break;
			case 3:

				let options = {

					mousePosition: {
						x: event.clientX, 
						y: event.clientY, 
					},
					
					value: true,
					content: props.src,
					id: props.buttonID

				}
				emits('showContextMenu', options)
				console.log('enviado el emit')
				break;
		}
	}

	onBeforeMount(() => {
		console.log(`Precargando el Launch Button #${props.buttonID}`)
	})

	onMounted(() => {
		console.log(`Launch Button #${props.buttonID} creado`)
	})

</script>


<template>

    <div class="launch-button" @mousedown="launch_button_click">
    	
    	<!--Button Header-->
        <div class="l-button-header" v-if="showContent">
            <div class="l-file-icon">
                {{ ext }}
            </div>
            <div class="l-button-captions">
                <p class="l-file-name">
                	{{ fileName }}
                </p>
                <p class="l-status">
                	{{ statusFile }}
              	</p>
            </div>
       </div>

       <!--Button Content-->
        <div class="l-button-content" v-if="showContent">
        	<div class="left">
        		<button class="loop-mode-btn">
					<i class="fa fa-rotate"></i>
				</button>
        	</div> 
        	<div class="right">

        		<div class="volume-slider-container">
        			<div class="volume-slider">
        				<i :class="{ 'fa fa-volume-xmark': volumeValue <= 0,'fa fa-volume-low': volumeValue < 40, 'fa fa-volume-off': volumeValue < 20, 'fa fa-volume-high': volumeValue > 40}"></i>
        				<span>{{ volumeValue + "%" }}</span>

	        			<input type="range" min="0" max="100" v-model="volumeValue">
	        			<progress min="0" max="100" :value="volumeValue"></progress>
        			</div>
        		</div>

        	</div>
        </div>
    </div>
    
</template>


<style scoped>
	.launch-button {
	    background-color: var(--secundary-bg-color);
	    border: 1px solid var(--panel-border-color);
	    color: var(--primary-text-color);
	    width: 130px;
	    height: 100px;
	    padding: 10px;
	    border-radius: 20px;
	    cursor: pointer;
	    transition: all 0.4s ease;
	}

	.launch-button:hover {
		transform: translateY(-3px);
		-webkit-box-shadow: 0px 4px 17px -3px rgba(13,84,122,0.8);
		-moz-box-shadow: 0px 4px 17px -3px rgba(13,84,122,0.8);
		box-shadow: 0px 4px 17px -3px rgba(13,84,122,0.8);
		background: rgb(25,25,26);
		background: radial-gradient(circle, rgba(25,25,26,1) 4%, rgba(3,3,3,1) 70%);
		border-radius: 10px;
	}

	/*HEADER STYLES*/
	.l-button-header {
		display: flex;
		justify-self: center;
		align-items: center;
		user-select: none;
	}
	.l-file-icon {
		background-color: var(--primary-bg-color);
		width: 30px;
		height: 30px;
		border-radius: 50%;
		text-align: center;
		line-height: 30px;
		font-family: Russo One;
		font-size: 10px;
		font-weight: 600;
		text-transform: uppercase;
	}

	.l-button-captions {
		margin-left: 5px;
		width: 95px;
		overflow: hidden;
	}

	.l-file-name {
		font-family: Russo One;
		font-size: 12px;
		margin-bottom: 2px;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.l-status {
		font-family: Roboto Regular;
		font-size: 10px;
		color: var(--secundary-text-color);
	}

	/*CONTENT BUTTON STYLES*/
	.l-button-content {
		display: flex;
	}

	.left {
		width: 55%;
		height: 75px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: flex-start;
		z-index: 99;
	}

	.right {
		width: 45%;
		height: 75px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: flex-start;
		position: relative;
		z-index: 99;
	}

	.loop-mode-btn {
		width: 24px;
		height: 25px;
		border: none;
		border-radius: 50%;
		cursor: pointer;
		color: #fff;
		background-color: #3B104A;
		transition: all 0.3s ease;
	}

	.loop-mode-btn:hover {
		background-color: #2A0B35;
		transform: rotate(360deg);
	}


	.volume-slider-container {
		position: absolute;
		transform: rotate(-90deg);
		top: 25px;
		left: 10px;
		overflow: hidden;
	}	

	.right:hover .volume-slider {
		transform: translateY(0);
		opacity: 1;
	}

	.volume-slider {
		position: relative;
		height: 100%;	
		transform: translateY(40px);
		opacity: 0;
		transition: all 0.5s ease;
	}

	/*Icon Volume*/
	.volume-slider > i {
		transform: rotate(90deg);
		font-size: 10px;
		position: absolute;
		top: 7px;
		left: 8px;
		z-index: 99;
	}

	/*Value Label*/
	.volume-slider > span {
		position: absolute;
		transform: rotate(90deg);
		font-family: Russo One;
		font-size: 9px;
		top: 8px;
		left: 30px;
		text-align: center;
	}

	/*Input Range*/
	.volume-slider input {
		width: 72px;
		-webkit-appearance: none;
		background: transparent;
		position: absolute;
		top: 0px;
		z-index: 99;
	}

	.volume-slider > input::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 5px;
		height: 25px;
		background-color: transparent;
		cursor: pointer;
	}

	/*Progress Bar*/
	.volume-slider progress {
		width: 72px;
		height: 25px;
		-webkit-appearance: none;
		overflow: hidden;
		border-radius: 20px;
	}

	.volume-slider progress::-webkit-progress-bar {
		background-color: #242323;
	}

	.volume-slider progress::-webkit-progress-value {
		background-color: #2F9AD7;
	}
	/*CONTENT BUTTON STYLES END*/

	/*ANIMATIONS*/
	
</style>