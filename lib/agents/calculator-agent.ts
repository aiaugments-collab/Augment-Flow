'use client';

import { CalculatorIntent } from '../agent-parser';
import { AgentResponse } from './gmail-agent';

class CalculatorAgent {
  async execute(intent: CalculatorIntent): Promise<AgentResponse> {
    try {
      const { expression, operation } = intent;
      
      // Clean and validate the expression
      const cleanExpression = this.cleanExpression(expression);
      
      if (!this.isValidExpression(cleanExpression)) {
        return {
          success: false,
          message: "Invalid mathematical expression. Please use only numbers and basic operators (+, -, *, /)."
        };
      }

      // Calculate the result
      const result = this.calculate(cleanExpression, operation);
      
      return {
        success: true,
        message: `🧮 ${expression} = ${result}`,
        data: { 
          expression: cleanExpression,
          result,
          operation 
        },
        action: 'calculation_completed'
      };
    } catch (error) {
      console.error('Calculator agent error:', error);
      return {
        success: false,
        message: 'Failed to calculate the expression. Please check your input and try again.'
      };
    }
  }

  private cleanExpression(expression: string): string {
    // Remove words and keep only mathematical expressions
    const cleaned = expression
      .replace(/what\s+is\s+/gi, '')
      .replace(/calculate\s+/gi, '')
      .replace(/compute\s+/gi, '')
      .replace(/\bplus\b/gi, '+')
      .replace(/\bminus\b/gi, '-')
      .replace(/\btimes\b/gi, '*')
      .replace(/\bmultiplied\s+by\b/gi, '*')
      .replace(/\bdivided\s+by\b/gi, '/')
      .replace(/\bequals?\b/gi, '')
      .replace(/[^\d+\-*/().\s]/g, '')
      .replace(/\s+/g, '')
      .trim();

    return cleaned;
  }

  private isValidExpression(expression: string): boolean {
    // Check if expression contains only valid characters
    const validPattern = /^[0-9+\-*/().\s]+$/;
    if (!validPattern.test(expression)) {
      return false;
    }

    // Check for balanced parentheses
    let openParens = 0;
    for (const char of expression) {
      if (char === '(') openParens++;
      if (char === ')') openParens--;
      if (openParens < 0) return false;
    }
    
    return openParens === 0;
  }

  private calculate(expression: string, operation: CalculatorIntent['operation']): number {
    try {
      // For simple operations, we can use direct calculation
      if (operation !== 'complex') {
        return this.calculateSimple(expression, operation);
      }

      // For complex expressions, use safe evaluation
      return this.evaluateExpression(expression);
    } catch {
      throw new Error('Calculation failed');
    }
  }

  private calculateSimple(expression: string, operation: CalculatorIntent['operation']): number {
    // Extract numbers from the expression
    const numbers = expression.match(/\d+\.?\d*/g)?.map(Number) || [];
    
    if (numbers.length < 2) {
      throw new Error('Need at least two numbers for calculation');
    }

    const [a, b] = numbers;

    switch (operation) {
      case 'add':
        return a + b;
      case 'subtract':
        return a - b;
      case 'multiply':
        return a * b;
      case 'divide':
        if (b === 0) throw new Error('Division by zero');
        return a / b;
      default:
        throw new Error('Unknown operation');
    }
  }

  private evaluateExpression(expression: string): number {
    // Simple recursive descent parser for mathematical expressions
    let index = 0;

    const parseNumber = (): number => {
      let numStr = '';
      while (index < expression.length && /[\d.]/.test(expression[index])) {
        numStr += expression[index++];
      }
      return parseFloat(numStr);
    };

    const parseFactor = (): number => {
      if (expression[index] === '(') {
        index++; // skip '('
        const result = parseExpression();
        index++; // skip ')'
        return result;
      }
      if (expression[index] === '-') {
        index++; // skip '-'
        return -parseFactor();
      }
      if (expression[index] === '+') {
        index++; // skip '+'
        return parseFactor();
      }
      return parseNumber();
    };

    const parseTerm = (): number => {
      let result = parseFactor();
      while (index < expression.length && /[*/]/.test(expression[index])) {
        const op = expression[index++];
        const right = parseFactor();
        if (op === '*') {
          result *= right;
        } else if (op === '/') {
          if (right === 0) throw new Error('Division by zero');
          result /= right;
        }
      }
      return result;
    };

    const parseExpression = (): number => {
      let result = parseTerm();
      while (index < expression.length && /[+-]/.test(expression[index])) {
        const op = expression[index++];
        const right = parseTerm();
        if (op === '+') {
          result += right;
        } else if (op === '-') {
          result -= right;
        }
      }
      return result;
    };

    const result = parseExpression();
    
    // Round to reasonable precision
    return Math.round(result * 1000000) / 1000000;
  }
}

export const calculatorAgent = new CalculatorAgent();
