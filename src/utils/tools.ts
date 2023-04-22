import { jwtUserDTO } from "src/modules/users/types/jwtUserDTO";

/** ****************************************************************************
 * Parse User - Get information from authorization header (JWT)
 * -----------------------------------------------------------------------------
 * @param headers Request headers
 * @returns Token body object
 **************************************************************************** */
export function parseUser(headers): jwtUserDTO | any {
  const jwt = extractJwt(headers);
  return parseToken(jwt);
};

/** ****************************************************************************
 * Extract JWT - Get JWT from request header
 * -----------------------------------------------------------------------------
 * Get the JWT on header.authorization ('Bearer authenticated_user_token')
 * 
 * @param headers Request header
 * @returns The JWT string
 **************************************************************************** */
export function extractJwt(headers): string {
  if (headers && !headers.authorization) {
    this.logger.verbose(`No authorization header`);
    return null;
  }
  const auth = headers.authorization.split(' ');
  // We only allow bearer
  if (auth[0].toLowerCase() !== 'bearer') {
    this.logger.verbose(`No bearer header`);
    return null;
  }
  return auth[1];
}


/** ****************************************************************************
 * Parse Token - Get information from JWT
 * -----------------------------------------------------------------------------
 * Get the body from JWT
 * 
 * @param token JWT
 * @returns Token body object
 **************************************************************************** */
export function parseToken(token): jwtUserDTO | any {
  const parts = token.split('.');
  return JSON.parse(Buffer.from(parts[1], 'base64').toString());
};