<script lang="ts">
	type Props = {
		text: string
		unitSize?: string
	}

	const { text, unitSize }: Props = $props()
	const GENERIC_SIZES = ['und', 'rollo']
	const CHARS = {
		á: 'a',
		é: 'e',
		í: 'i',
		ó: 'o',
		ú: 'u',
		Á: 'A',
		É: 'E',
		Í: 'I',
		Ó: 'O',
		Ú: 'U',
		ñ: 'n',
		Ñ: 'N',
		Ø: ''
	}
	let isClipboardButtonPressed = $state(false)

	const isGenericSize = unitSize ? GENERIC_SIZES.includes(unitSize.toLowerCase()) : false

	const cleanText = text
		.replace(/[áéíóúÁÉÍÓÚñÑ]/g, (match) => CHARS[match])
		.replace(/"/g, ' pulgadas')
		.replace(/[^a-zA-Z0-9 =.:(),/-]/g, '')
		.replace(/^(\w+)/, !isGenericSize ? `$1 ( ${unitSize} ) ` : '$1')
		.toUpperCase()

	function copyText(text: string) {
		navigator.clipboard.writeText(unitSize ? cleanText : text)
		isClipboardButtonPressed = true
		setTimeout(() => {
			isClipboardButtonPressed = false
		}, 2000)
	}
</script>

<div data-tip={isClipboardButtonPressed ? 'copiado' : 'copiar'} class="tooltip tooltip-accent">
	<div class="cursor-copy rounded-full font-mono" onclick={() => copyText(text)}>
		{text}
	</div>
</div>
