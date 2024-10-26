import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRespository: Repository<Location>
  ){}

  create(createLocationDto: CreateLocationDto) {
    return this.locationRespository.save(createLocationDto);
  }

  findAll() {
    return this.locationRespository.find();
  }

  findOne(id: number) {
    const location = this.locationRespository.findOneBy({
      locationId: id,
    })
    if (!location) throw new NotFoundException("Location not found")
      return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const location = await this.locationRespository.preload({
      locationId: id,
      ...updateLocationDto,
    })
    return this.locationRespository.save(location);
  }

  remove(id: number) {
    return this.locationRespository.delete({
      locationId: id,
    })
  }
}
