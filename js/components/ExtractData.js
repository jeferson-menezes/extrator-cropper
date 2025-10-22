export default {
        props: ['dados'],
        emits: ['trocarTela'],
        template: `
 <v-container>
    <v-card>
        <v-toolbar color="primary" title="User Profile"></v-toolbar>

        <div class="d-flex flex-row">
            <!-- TABS LATERAIS -->
            <v-tabs v-model="tab" color="primary" direction="vertical">
                <v-tab prepend-icon="mdi-account" value="option-1">Cartório</v-tab>
                <v-tab prepend-icon="mdi-lock" value="option-2">Registro</v-tab>
                <v-tab prepend-icon="mdi-lock" value="option-3">Declarante</v-tab>
                <v-tab prepend-icon="mdi-access-point" value="option-4">Genitores</v-tab>
                <v-tab prepend-icon="mdi-lock" value="option-5">Avós</v-tab>
            </v-tabs>

            <!-- CONTEÚDO DAS ABAS -->
            <v-window v-model="tab" class="flex-grow-1">
                <v-window-item value="option-1">
                    <v-card flat>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" sm="7">
                                    <v-text-field label="Cartório" v-model="dados.cartorio.nome"></v-text-field></v-col>
                                <v-col cols="12" sm="5"><v-text-field label="Subdistrito"
                                        v-model="dados.cartorio.subdistrito"></v-text-field></v-col>
                                <v-col cols="12" sm="3"><v-text-field label="Cidade"
                                        v-model="dados.cartorio.cidade"></v-text-field></v-col>
                                <v-col cols="12" sm="3"><v-text-field label="Estado"
                                        v-model="dados.cartorio.estado"></v-text-field></v-col>
                                <v-col cols="12" sm="2"><v-text-field label="Livro"
                                        v-model="dados.cartorio.livro"></v-text-field></v-col>
                                <v-col cols="12" sm="2"><v-text-field label="Folha"
                                        v-model="dados.cartorio.folha"></v-text-field></v-col>
                                <v-col cols="12" sm="2"><v-text-field label="Termo" v-model="certidao.cartorio.termo"
                                        </v-text-field></v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="12" sm="6"><v-text-field label="Nome"
                                        v-model="dados.oficial.nome"></v-text-field></v-col>
                                <v-col cols="12" sm="6"><v-text-field label="Cargo"
                                        v-model="dados.oficial.cargo"></v-text-field></v-col>
                            </v-row>

                        </v-card-text>
                    </v-card>
                </v-window-item>

                <v-window-item value="option-2">
                    <v-card flat>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" sm="3"><v-text-field label="Data do Registro"
                                        v-model="dados.registro.dataRegistro"></v-text-field></v-col>
                                <v-col cols="12" sm="6"><v-text-field label="Nome"
                                        v-model="dados.registro.nomeRegistrado"></v-text-field></v-col>
                                <v-col cols="12" sm="3"><v-text-field label="Sexo"
                                        v-model="dados.registro.sexo"></v-text-field></v-col>
                                <v-col cols="12" sm="3"><v-text-field label="Data Nascimento"
                                        v-model="dados.registro.dataNascimento"></v-text-field></v-col>
                                <v-col cols="12" sm="3"><v-text-field label="Hora Nascimento"
                                        v-model="dados.registro.horaNascimento"></v-text-field></v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="12" sm="8"><v-text-field label="Hospital"
                                        v-model="dados.registro.localNascimento.hospital"></v-text-field></v-col>
                                <v-col cols="12" sm="4"><v-text-field label="Endereço Hospital"
                                        v-model="dados.registro.localNascimento.endereco"></v-text-field></v-col>
                                <v-col cols="12" sm="3"><v-text-field label="Cidade"
                                        v-model="dados.registro.localNascimento.cidade"></v-text-field></v-col>
                                <v-col cols="12" sm="3"><v-text-field label="Estado"
                                        v-model="dados.registro.localNascimento.estado"></v-text-field></v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-window-item>

                <v-window-item value="option-3">
                    <v-card flat>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" sm="6"><v-text-field label="Nome Declarante"
                                        v-model="dados.declarante.nome"></v-text-field></v-col>

                                <v-col cols="12" sm="3"><v-text-field label="Nascionalidade"
                                        v-model="dados.declarante.nacionalidade"></v-text-field></v-col>

                                <v-col cols="12" sm="3"><v-text-field label="Estado Civil"
                                        v-model="dados.declarante.estadoCivil"></v-text-field></v-col>

                                <v-col cols="12" sm="3"><v-text-field label="Profissão"
                                        v-model="dados.declarante.profissao"></v-text-field></v-col>

                                <v-col cols="12" sm="6"><v-text-field label="Endereço Declarante"
                                        v-model="dados.declarante.endereco"></v-text-field></v-col>

                                <v-col cols="12" sm="3"><v-text-field label="Data Nacimento Declarante"
                                        v-model="dados.declarante.dataNascimento"></v-text-field></v-col>

                                <v-col cols="12" sm="4"><v-text-field label="Naturalidade"
                                        v-model="dados.declarante.naturalidade"></v-text-field></v-col>

                                <v-col cols="12" sm="4"><v-text-field label="RG Declarante"
                                        v-model="dados.declarante.documentos.rg"></v-text-field></v-col>

                                <v-col cols="12" sm="4"><v-text-field label="CPF Declarante"
                                        v-model="dados.declarante.documentos.cpf"></v-text-field></v-col>

                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-window-item>

                <v-window-item value="option-4">
                    <v-card flat>
                        <v-card-text>
                            <h3>Pai</h3>
                            <v-row>
                                <v-col cols="12" sm="6"><v-text-field label="Nome do Pai"
                                        v-model="dados.genitores.pai.nome"></v-text-field></v-col>
                                <v-col cols="12" sm="3"><v-text-field label="Nacionalidade"
                                        v-model="dados.genitores.pai.nacionalidade"></v-text-field></v-col>
                                <v-col cols="12" sm="3"><v-text-field label="Estado Civil"
                                        v-model="dados.genitores.pai.estadoCivil"></v-text-field></v-col>
                                <v-col cols="12" sm="4"><v-text-field label="Profissão"
                                        v-model="dados.genitores.pai.profissao"></v-text-field></v-col>

                                <v-col cols="12" sm="3"><v-text-field label="Data de Nascimento"
                                        v-model="dados.genitores.pai.dataNascimento"></v-text-field></v-col>
                                <v-col cols="12" sm="5"><v-text-field label="Endereco"
                                        v-model="dados.genitores.pai.endereco"></v-text-field></v-col>

                                <v-col cols="12" sm="3"><v-text-field label="Naturalidade"
                                        v-model="dados.genitores.pai.naturalidade"></v-text-field></v-col>


                                <v-col cols="12" sm="3"><v-text-field label="RG"
                                        v-model="dados.genitores.pai.documentos.rg"></v-text-field></v-col>
                                <v-col cols="12" sm="3"><v-text-field label="CPF"
                                        v-model="dados.genitores.pai.documentos.cpf"></v-text-field></v-col>
                            </v-row>

                            <h3>Mãe</h3>
                            <v-row>
                                <v-col cols="12" sm="6"><v-text-field label="Nome do Mãe"
                                        v-model="dados.genitores.mae.nome"></v-text-field></v-col>
                                <v-col cols="12" sm="3"><v-text-field label="Nacionalidade"
                                        v-model="dados.genitores.mae.nacionalidade"></v-text-field></v-col>
                                <v-col cols="12" sm="3"><v-text-field label="Estado Civil"
                                        v-model="dados.genitores.mae.estadoCivil"></v-text-field></v-col>
                                <v-col cols="12" sm="4"><v-text-field label="Profissão"
                                        v-model="dados.genitores.mae.profissao"></v-text-field></v-col>

                                <v-col cols="12" sm="3"><v-text-field label="Data de Nascimento"
                                        v-model="dados.genitores.mae.dataNascimento"></v-text-field></v-col>
                                <v-col cols="12" sm="5"><v-text-field label="Endereco"
                                        v-model="dados.genitores.mae.endereco"></v-text-field></v-col>

                                <v-col cols="12" sm="3"><v-text-field label="Naturalidade"
                                        v-model="dados.genitores.mae.naturalidade"></v-text-field></v-col>


                                <v-col cols="12" sm="3"><v-text-field label="RG"
                                        v-model="dados.genitores.mae.documentos.rg"></v-text-field></v-col>
                                <v-col cols="12" sm="3"><v-text-field label="CPF"
                                        v-model="dados.genitores.mae.documentos.cpf"></v-text-field></v-col>
                            </v-row>

                        </v-card-text>
                    </v-card>
                </v-window-item>

                <v-window-item value="option-5">
                    <v-card flat>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" sm="12"><v-text-field label="Paternos"
                                        v-model="dados.avos.paternos"></v-text-field></v-col>
                                <v-col cols="12" sm="12"><v-text-field label="Maternos"
                                        v-model="dados.avos.maternos"></v-text-field></v-col>
                            </v-row>

                        </v-card-text>
                    </v-card>
                </v-window-item>

            </v-window>
        </div>
    </v-card>
</v-container>
  `,

        data() {
                return { certidao: this.dados, tab: 'option-1' }
        },

        methods: {
                dowloadJson() {
                        console.log(this.certidao);
                }
        },
        mounted() {

        }
};
