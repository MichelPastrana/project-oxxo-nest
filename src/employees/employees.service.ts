import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { v4 as uuid } from "uuid";
import { last, map } from 'rxjs';
import { Employee } from './entities/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ){}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeeRepository.save(createEmployeeDto);
    return employee;
  }

  findAll() {
    return this.employeeRepository.find();
  }

  findByLocation(id: number) {
    return this.employeeRepository.findBy({
      location: {
        locationId: id
      }
    })
  }

  findOne(id: string) {
    const employee = this.employeeRepository.findBy({
      employeeId: id
    })
    if (!employee) throw new NotFoundException()
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      employeeId: id,
      ...updateEmployeeDto
    })
    if (!employeeToUpdate) throw new NotFoundException()
    this.employeeRepository.save(employeeToUpdate)
    return employeeToUpdate;
  }

  remove(id: string) {
    this.employeeRepository.delete({
      employeeId: id
    })
    return 'Employee deleted';
  }
}
