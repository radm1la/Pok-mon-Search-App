document.getElementById("search-button").addEventListener("click", function () {
    const searchInput = document.getElementById("search-input").value.trim().toLowerCase();
  
    if (!searchInput) {
      alert("Please enter a Pokémon name or ID.");
      return;
    }
  
    const apiUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput}`;
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("Pokémon not found");
        }
        return response.json();
      })
      .then(data => {
        displayPokemonInfo(data);
      })
      .catch(error => {
        alert("Pokémon not found");
        document.getElementById("pokemon-info").style.display = "none";
      });
  });
  
  function displayPokemonInfo(pokemon) {
    const { id, name, height, weight, types, stats, sprites } = pokemon;
  

    document.getElementById("pokemon-name").innerText = name.toUpperCase();
    document.getElementById("pokemon-id").innerText = id;
  

    const spriteElement = document.getElementById("sprite");
    spriteElement.src = sprites.front_default;
    spriteElement.alt = `${name} sprite`;
  

    document.getElementById("height").innerText = height;
    document.getElementById("weight").innerText = weight;
  

    const typesContainer = document.getElementById("types");
    typesContainer.innerHTML = '';
    types.forEach(typeInfo => {
      const typeElement = document.createElement("span");
      typeElement.innerText = typeInfo.type.name.toUpperCase();
      typesContainer.appendChild(typeElement);
    });
  

    const hp = stats.find(stat => stat.stat.name === "hp").base_stat;
    const attack = stats.find(stat => stat.stat.name === "attack").base_stat;
    const defense = stats.find(stat => stat.stat.name === "defense").base_stat;
    const specialAttack = stats.find(stat => stat.stat.name === "special-attack").base_stat;
    const specialDefense = stats.find(stat => stat.stat.name === "special-defense").base_stat;
    const speed = stats.find(stat => stat.stat.name === "speed").base_stat;
  
    document.getElementById("hp").innerText = hp;
    document.getElementById("attack").innerText = attack;
    document.getElementById("defense").innerText = defense;
    document.getElementById("special-attack").innerText = specialAttack;
    document.getElementById("special-defense").innerText = specialDefense;
    document.getElementById("speed").innerText = speed;
  
    document.getElementById("pokemon-info").style.display = "block";
  }
  