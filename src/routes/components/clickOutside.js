// This is a Svelte action that detects clicks outside of an element
export function clickOutside(node, onEventFunction) {
    const handleClick = (event) => {
      if (node && !node.contains(event.target) && !event.defaultPrevented) {
        onEventFunction();
      }
    };
  
    document.addEventListener('click', handleClick, true);
  
    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
    };
  }