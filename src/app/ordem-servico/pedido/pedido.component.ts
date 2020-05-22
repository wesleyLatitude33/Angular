import { Component, OnInit } from '@angular/core';
import { Convenio } from 'src/app/model/Convenio';
import { Paciente } from 'src/app/model/Paciente';
import { Medico } from 'src/app/model/Medico';
import { OrdemServico } from '../model/OrdemServico';
import { PostoColeta } from 'src/app/model/PostoColeta';
import { ConvenioService } from 'src/app/service/convenio.service';
import { PacienteService } from 'src/app/service/paciente.service';
import { MedicoService } from 'src/app/service/medico.service';
import { OrdemServicoService } from '../service/ordem-servico.service';
import { DatePipe } from '@angular/common';
import { UsuarioService } from 'src/app/acesso/usuario.service';
import { PostoColetaService } from 'src/app/service/posto-coleta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  private convenios : Convenio[];
  private pacientes : Paciente[];
  private medicos : Medico[];
   
  private convenio : string;
  private paciente = new Paciente();
  private medico = new Medico();
  private ordemServico = new OrdemServico();
  private postoColeta = new PostoColeta();

  constructor(
    private convenioService:ConvenioService,
    private pacienteService:PacienteService,
    private medicoService:MedicoService,
    private ordemServicoService:OrdemServicoService,
    private datePipe: DatePipe,
    private usuarioService: UsuarioService,
    private postoColetaService: PostoColetaService,
    private router: Router   
  ) { }

  ngOnInit() {
    this.buscarConvenios();
    this.buscarPacientes();
    this.buscarMedicos();

    var hoje = new Date();
    this.ordemServico.dataOs = this.datePipe.transform(hoje, 'yyyy-MM-dd');
    this.ordemServico.userLabId = this.usuarioService.getUsuario().id;
    
    this.postoColetaService.getPorId(this.usuarioService.getUsuario().postoColetaId)
                           .subscribe((pColeta: PostoColeta) => {
                              this.postoColeta = pColeta;
                           })
  }

   /*******************************/
  /*          MÉTODOS            */
  /*******************************/
  public getOrdemServico():OrdemServico{
    return this.ordemServico;
  }
  private finalizarOrdem(){
    if (this.ordemServico.dataRetirada != null){
      this.gravarOrdem();
      let ordem = {
        'id' : this.ordemServico.id,
        'dataOs' : this.datePipe.transform(this.ordemServico.dataOs, 'dd/MM/yyyy'),
        'dataRetirada' : this.datePipe.transform(this.ordemServico.dataRetirada, 'dd/MM/yyyy'),
        'convenio' : this.paciente.convenio,
        'medico' : this.medico.nome,
        'paciente' : this.paciente.nome,
        'postoColeta':this.postoColeta.descricao,
        'postoColetaEndereco': this.postoColeta.endereco,
        'total' : 0
      };

      this.ordemServicoService.setOrdemAtual(ordem);
      this.router.navigate(['protocoloOs']);
    }else{
      alert('Informe a data da retirada');
    }
  }

  private validarForm(ordemServico :OrdemServico) {
    let valida = true; 
    if (ordemServico.medicoId == null){
        alert('Preencha nome do médico');
        valida = false;
     }
     if (ordemServico.pacienteId == null){
        alert('Preencha o nome do paciente');
        valida = false;
     }
          
     return valida;
  }

  private gravarOrdem(){
      
      this.ordemServico.pacienteId = this.paciente.id;
      this.ordemServico.medicoId = this.medico.id;

      if (this.ordemServico.id == null){
        if (this.validarForm(this.ordemServico)){
            this.ordemServicoService
                  .criar(this.ordemServico)
                  .subscribe((ordemServico: OrdemServico) => {
                      this.ordemServico.id = ordemServico.id;
                  });
        }
      }else{
          this.ordemServicoService
                .atualizar(this.ordemServico)
                .subscribe((ordemServico: OrdemServico) => {
                    this.ordemServico = ordemServico;
                });
        
      }
  }

  private buscarConvenios(){
    this.convenioService.getTodos().subscribe((convenios: Convenio[]) => {
      this.convenios = convenios;
    })
  }

  buscarPacientes(){
    this.pacienteService.getTodos().subscribe((pacientes: Paciente[]) => {
      this.pacientes = pacientes;
    })
  }
  buscarMedicos(){
    this.medicoService.getTodos().subscribe((medicos: Medico[]) => {
      this.medicos = medicos;
    })
  }


}
