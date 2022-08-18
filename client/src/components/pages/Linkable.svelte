<script>
	export let link;
</script>
{#if link}
	<a href={link} target="_blank" class="cursor-pointer"><slot></slot></a>
{:else}
	<slot></slot>
{/if}