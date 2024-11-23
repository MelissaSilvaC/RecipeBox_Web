const filters = [
     {
          name: "Sem Carne",
          tags: [
               { name: "Vegano", color: "#597D64" },
               { name: "Vegetariano", color: "#597D64" },
          ],
     },
     {
          name: "Intolerantes",
          tags: [
               { name: "Sem Frutose", color: "#00BCD4" },
               { name: "Sem Glúten", color: "#00BCD4" },
               { name: "Sem Histamina", color: "#00BCD4" },
               { name: "Sem Lactose", color: "#00BCD4" },
          ],
     },
     {
          name: "Alérgicos",
          tags: [
               { name: "Amendoim", color: "#F44336" },
               { name: "Castanhas", color: "#F44336" },
               { name: "Gergelim", color: "#F44336" },
               { name: "Frutos do Mar", color: "#F44336" },
               { name: "Leite", color: "#F44336" },
               { name: "Nozes", color: "#F44336" },
               { name: "Ovos", color: "#F44336" },
               { name: "Soja", color: "#F44336" },
          ],
     },
     {
          name: "Tipo de Refeição",
          tags: [
               { name: "Almoço", color: "#FF9700" },
               { name: "Café da Manhã", color: "#FF9700" },
               { name: "Jantar", color: "#FF9700" },
               { name: "Lanchinho", color: "#FF9700" },
               { name: "Petisco", color: "#FF9700" },
               { name: "Sobremesa", color: "#FF9700" },
          ],
     },
     {
          name: "Facilidade",
          tags: [
               { name: "Em 10 Minutos", color: "#E91E63" },
               { name: "Em 20 Minutos", color: "#E91E63" },
               { name: "Feito na Airfrayer", color: "#E91E63" },
               { name: "Ideal para Marmita", color: "#E91E63" },
               { name: "Micro-ondas", color: "#E91E63" },
               { name: "Rápido", color: "#E91E63" },
               { name: "Sem Batedeira", color: "#E91E63" },
               { name: "Sem Fogão", color: "#E91E63" },
               { name: "Sem Forno", color: "#E91E63" },
               { name: "Sem Fritar", color: "#E91E63" },
               { name: "Uma Panela Só", color: "#E91E63" },
          ],
     },
];


// Função para buscar cor da tag
function getTagColor(tagName) {
     for (const filter of filters) {
          const tag = filter.tags.find(t => t.name === tagName);
          if (tag) return tag.color;
     }
     return "#CCCCCC"; // Cor padrão caso não seja encontrada
}

module.exports = { filters, getTagColor };