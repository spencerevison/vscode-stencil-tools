import { StyleConfig } from './types/style-config.interface';
import { ComponentConfig } from './types/component-config.interface';
export interface FileConfig {
    component: ComponentConfig,
    style: StyleConfig
}