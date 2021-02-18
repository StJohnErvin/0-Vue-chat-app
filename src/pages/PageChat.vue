<template>
  <q-page 
  	ref="pageChat"
  	class="page-chat flex column">
 
  	<div 
  		:class="{ 'invisible' : !showMessages }"
  		class="q-pa-md column col justify-end">
  		<q-chat-message
  			v-for="(message, key) in messages"
  			:key="key"
  		  :text="[message.text]"
  		  :sent="message.from == 'me' ? true : false"
  		  :bg-color="message.from == 'me' ? 'grey-4' : 'info'"
  		/>
  	</div>
  	<q-footer elevated>
  	  <q-toolbar>
  	  	<q-form 
  	  		@submit="sendMessage"
  	  		class="full-width">
	  	    <q-input
	  	    	v-model="newMessage"
	  	    	@blur="scrollToBottom"
	  	    	ref="newMessage"
	  	    	bg-color="white"
	  	    	outlined
	  	    	placeholder="Message"
	  	    	dense>

	  	      <template v-slot:after>
	  	        <q-btn
	  	        	round
	  	        	dense
	  	        	flat
	  	        	type="submit"
	  	        	color="white"
	  	        	icon="send" />
	  	      </template>
	  	    </q-input>
  	  	</q-form>
  	  </q-toolbar>
  	</q-footer>
  </q-page>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import mixinOtherUserDetails from 'src/mixins/mixin-other-user-details.js'

	export default {
		mixins: [mixinOtherUserDetails],
	  data() {
	  	return {
	  		newMessage: '',
	  		showMessages: false
	  	}
	  },
	  computed: {
	  	...mapState('store', ['messages', 'userDetails'])
	  },
	  methods: {
	  	...mapActions('store', ['firebaseGetMessages', 'firebaseStopGettingMessages', 'firebaseSendMessage']),
	  	sendMessage() {
	  		this.firebaseSendMessage({
	  			message: {
		  			text: this.newMessage,
		  			from: 'me'
	  			},
	  			otherUserId: this.$route.params.otherUserId
	  		})
	  		this.clearMessage()
	  	},
	  	clearMessage() {
	  		this.newMessage = ''
	  		this.$refs.newMessage.focus()
	  	},
	  	scrollToBottom() {
	  		let pageChat = this.$refs.pageChat.$el
	  		setTimeout(() => {
		  		window.scrollTo(0, pageChat.scrollHeight)
	  		}, 20);
	  	}
	  },
	  watch: {
	  	messages: function(val) {
	  		if (Object.keys(val).length) {
	  			this.scrollToBottom()
	  			setTimeout(() => {
	  				this.showMessages = true
	  			}, 200)
	  		}
	  	}
	  },
	  mounted() {
	  	this.firebaseGetMessages(this.$route.params.otherUserId)
	  },
	  destroyed() {
	  	this.firebaseStopGettingMessages()
	  }
	}
</script>

<style scoped></style>
